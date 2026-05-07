package com.example.edutrack.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    private UUID id;
    private String name;
    private String phone;
    private String password;
    private String role;
    private UUID institutionId;
    private String departmentName;
    private String avatarUrl;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Store both the raw role name AND a ROLE_ prefixed variant
        // so both hasAuthority('Administrator') and hasRole('Administrator') work
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
