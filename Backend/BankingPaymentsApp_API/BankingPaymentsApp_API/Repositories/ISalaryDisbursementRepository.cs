using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface ISalaryDisbursementRepository
    {
        public IQueryable<SalaryDisbursement> GetAll();
        Task<SalaryDisbursement?> GetById(int id);
        Task<SalaryDisbursement> Add(SalaryDisbursement disbursement);
        Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement);
        Task DeleteById(int id);
    }
}
