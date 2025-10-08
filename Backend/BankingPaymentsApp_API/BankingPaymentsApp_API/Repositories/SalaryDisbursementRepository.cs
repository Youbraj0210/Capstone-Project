using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class SalaryDisbursementRepository : ISalaryDisbursementRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;

        public SalaryDisbursementRepository(BankingPaymentsDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IQueryable<SalaryDisbursement> GetAll()
        {
            return _dbContext.SalaryDisbursements
                             .Include(sd => sd.ClientUser).ThenInclude(u => u.Employees)
                             .Include(sd => sd.DisbursementStatus)
                             .Include(sd => sd.Employees)
                             .Include(sd => sd.DisbursementDetails)
                             .AsQueryable();
        }

        public async Task<SalaryDisbursement?> GetById(int id)
        {
            return await _dbContext.SalaryDisbursements
                .Include(s => s.ClientUser).ThenInclude(u => u.Account)
                .Include(s => s.DisbursementDetails).ThenInclude(d=>d.Employee)
                .Include(s => s.Employees)
                .FirstOrDefaultAsync(s => s.SalaryDisbursementId == id);
        }


        public async Task<SalaryDisbursement> Add(SalaryDisbursement disbursement)
        {
            await _dbContext.SalaryDisbursements.AddAsync(disbursement);
            await _dbContext.SaveChangesAsync();
            return disbursement;
        }

        public async Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement)
        {
            var existing = await GetById(disbursement.SalaryDisbursementId);

            if (existing == null) return null;

            existing.ClientId = disbursement.ClientId;
            existing.TotalAmount = disbursement.TotalAmount;
            existing.DisbursementDate = disbursement.DisbursementDate;

            existing.DisbursementDetails = disbursement.DisbursementDetails;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task DeleteById(int id)
        {
            var existing = await GetById(id);

            if (existing == null) return;

            _dbContext.SalaryDisbursements.Remove(existing);
            await _dbContext.SaveChangesAsync();
        }
    }
}
