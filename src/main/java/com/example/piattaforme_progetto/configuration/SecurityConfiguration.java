//package com.example.piattaforme_progetto.configuration;
//import com.example.piattaforme_progetto.Support.authentication.JwtAuthenticationConverter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//import java.util.Arrays;
//
//
//@Configuration
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//
//
//    @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.csrf().disable()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                .antMatchers("/check/simple").permitAll()
//                .antMatchers("/users/**").permitAll()
//                .antMatchers("/products/**").permitAll()
//                .antMatchers("/purchases/**").permitAll()
//                .anyRequest().authenticated().and().oauth2ResourceServer().jwt().jwtAuthenticationConverter(new JwtAuthenticationConverter());
//    }
//
//
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
////                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
////                .antMatchers("/check/simple").permitAll()
////                .antMatchers("/users/**").permitAll()
////                .antMatchers("/products/**").permitAll()
////                .antMatchers("/purchases/**").permitAll()
////                .anyRequest().authenticated().and().oauth2ResourceServer().jwt().jwtAuthenticationConverter(new JwtAuthenticationConverter());
////    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("OPTIONS");
//        configuration.addAllowedMethod("GET");
//        configuration.addAllowedMethod("POST");
//        configuration.addAllowedMethod("PUT");
//        source.registerCorsConfiguration("/**", configuration);
//        return new CorsFilter(source);
//    }
//
//
//}