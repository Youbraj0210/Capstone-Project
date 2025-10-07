﻿using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class ClientUserRepository : IClientUserRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public ClientUserRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }


        public IQueryable<ClientUser> GetAll()
        {
            return _dbContext.ClientUsers
                             .Include(cu => cu.Account)
                             .Include(cu => cu.Beneficiaries)
                             .Include(cu => cu.Employees)
                             .Include(cu => cu.BankUser)
                             .Include(cu => cu.Documents)
                             .Include(cu=>cu.Bank)
                             .AsQueryable();
        }

        public async Task<ClientUser> Add(ClientUser user)
        {
            await _dbContext.ClientUsers.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<ClientUser?> GetById(int id)
        {
            return await _dbContext.ClientUsers.Include(u => u.Role).Include(u => u.Account).Include(u => u.Documents).Include(u=>u.Employees).Include(u=>u.Beneficiaries).Include(u=>u.BankUser).Include(u=>u.Bank).FirstOrDefaultAsync(d => d.UserId.Equals(id));
        }

        public async Task<ClientUser?> Update(ClientUser user)
        {
            ClientUser? existingClientUser = await GetById(user.UserId);

            if (existingClientUser == null)
                return null;

            existingClientUser.UserEmail = user.UserEmail;
            existingClientUser.UserPhone = user.UserPhone;
            existingClientUser.UserFullName = user.UserFullName;
            existingClientUser.UserName = user.UserName;
            existingClientUser.Password = user.Password;
            existingClientUser.UserRoleId = user.UserRoleId;
            existingClientUser.Address = user.Address;
            existingClientUser.DateOfBirth = user.DateOfBirth;
            existingClientUser.KycVierified = user.KycVierified;
            existingClientUser.AccountId = user.AccountId;
            existingClientUser.BankUserId = user.BankUserId;

            await _dbContext.SaveChangesAsync();
            return existingClientUser;
        }

        public async Task DeleteById(int id)
        {
            ClientUser? exisitngClientUser = await GetById(id);
            if (exisitngClientUser == null) return;
            _dbContext.ClientUsers.Remove(exisitngClientUser);
            await _dbContext.SaveChangesAsync();
        }
    }
}
