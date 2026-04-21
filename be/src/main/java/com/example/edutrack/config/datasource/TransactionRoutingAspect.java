package com.example.edutrack.config.datasource;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import java.lang.reflect.Method;

@Aspect
@Component
public class TransactionRoutingAspect {

    @Before("@annotation(transactional)")
    public void setDataSourceType(JoinPoint joinPoint, Transactional transactional) {
        if (transactional.readOnly()) {
            DataSourceContextHolder.setBranch(DataSourceType.REPLICA);
        } else {
            DataSourceContextHolder.setBranch(DataSourceType.MASTER);
        }
    }

    // Fallback for class-level @Transactional
    @Before("execution(* com.example.edutrack.service..*.*(..))")
    public void checkClassTransactional(JoinPoint joinPoint) {
        if (DataSourceContextHolder.getBranch() != null) return;

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Transactional transactional = method.getAnnotation(Transactional.class);
        
        if (transactional == null) {
            transactional = joinPoint.getTarget().getClass().getAnnotation(Transactional.class);
        }

        if (transactional != null) {
            if (transactional.readOnly()) {
                DataSourceContextHolder.setBranch(DataSourceType.REPLICA);
            } else {
                DataSourceContextHolder.setBranch(DataSourceType.MASTER);
            }
        }
    }

    @org.aspectj.lang.annotation.After("@annotation(transactional) || execution(* com.example.edutrack.service..*.*(..))")
    public void clearDataSourceType() {
        DataSourceContextHolder.clear();
    }
}
