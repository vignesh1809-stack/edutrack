package com.example.edutrack.config.datasource;

public class DataSourceContextHolder {
    private static final ThreadLocal<DataSourceType> CONTEXT = new ThreadLocal<>();

    public static void setBranch(DataSourceType dbType) {
        CONTEXT.set(dbType);
    }

    public static DataSourceType getBranch() {
        return CONTEXT.get();
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
