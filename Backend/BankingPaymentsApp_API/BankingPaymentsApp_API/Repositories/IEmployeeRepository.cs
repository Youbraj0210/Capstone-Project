﻿using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IEmployeeRepository
    {
        public IQueryable<Employee> GetAll();

        public Task<Employee> Add(Employee employee);
        public Task<Employee?> GetById(int id);
        public Task<Employee?> Update(Employee employee);
        public Task DeleteById(int id);
        public Task<(IEnumerable<Employee> inserted, List<string> skipped)> BulkInsert(List<Employee> employees);

    }
}
