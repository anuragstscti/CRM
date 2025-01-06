﻿using CRM.Repository.Interface;

namespace CRM.Repository
{
    public static class ServiceExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ISystemConfiguration, SystemConfiguration>();
        }
    }
}