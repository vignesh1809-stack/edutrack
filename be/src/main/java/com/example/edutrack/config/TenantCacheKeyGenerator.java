package com.example.edutrack.config;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.lang.reflect.Method;

@Component("tenantKeyGenerator")
public class TenantCacheKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        String tenantId = TenantContext.getCurrentTenant();
        if (tenantId == null) {
            tenantId = "GLOBAL";
        }
        return tenantId + ":" + target.getClass().getSimpleName() + ":" + method.getName() + ":" +
               StringUtils.arrayToDelimitedString(params, "_");
    }
}
