package com.rbac.gateway.filter;

import com.rbac.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

// @Component
public class JwtFilter extends AbstractGatewayFilterFactory<JwtFilter.Config> {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public JwtFilter() {
        super(Config.class);
    }

    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            String path = exchange.getRequest().getURI().getPath();

            if (path.contains("/auth")) {
                return chain.filter(exchange);
            }

            String resource;

            if (path.contains("/users")) {
                resource = "USER";
            } else if (path.contains("/assets")) {
                resource = "ASSET";
            } else {
                resource = "UNKNOWN";
            }

            String authHeader = exchange.getRequest()
                    .getHeaders()
                    .getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String token = authHeader.substring(7);

            Claims claims;

            try {
                claims = JwtUtil.validateToken(token);
            } catch (Exception e) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String role = claims.get("role", String.class);

            String method = exchange.getRequest().getMethod().name();

            String action;

            switch(method){
                case "GET":
                    action="READ";
                    break;
                case "POST":
                    action="CREATE";
                    break;
                case "PUT":
                    action="UPDATE";
                    break;
                case "DELETE":
                    action="DELETE";
                    break;
                default:
                    action=method;
            }

            Map<String,String> body = new HashMap<>();
            body.put("roleName",role);
            body.put("resource",resource);
            body.put("action",action);

            return webClientBuilder.build()
                    .post()
                    .uri("http://ACCESS-SERVICE/access/check")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .flatMap(allowed -> {

                        if(Boolean.FALSE.equals(allowed)){
                            exchange.getResponse()
                                    .setStatusCode(HttpStatus.FORBIDDEN);
                            return exchange.getResponse().setComplete();
                        }

                        return chain.filter(exchange);

                    })

                    .onErrorResume(e -> {
                        e.printStackTrace();
                        exchange.getResponse()
                                .setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
                        return exchange.getResponse().setComplete();
                    });

        };
    }
}