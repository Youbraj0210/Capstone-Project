﻿using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IMapper _mapper;
        public TransactionController(ITransactionService transactionService, IMapper mapper)
        {
            _transactionService = transactionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? clientId,
            [FromQuery] int? bankuserId,
            [FromQuery] int? transactionId,
            [FromQuery] int? transactionTypeId,
            [FromQuery] double? minAmount,
            [FromQuery] double? maxAmount,
            [FromQuery] DateTime? createdFrom,
            [FromQuery] DateTime? createdTo,
            [FromQuery] string? toFrom,
            [FromQuery] DateTime? date,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
            var response = await _transactionService.GetAll(clientId, bankuserId, transactionId, transactionTypeId, createdFrom, createdTo, maxAmount, minAmount, toFrom, pageNumber, pageSize);

            if (!response.Any())
                return Ok(response);

            return Ok(response);
        }

        // POST: api/Transaction
        [HttpPost]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateTransaction(RegisterTransactionDTO transaction)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Transaction newTransaction = _mapper.Map<Transaction>(transaction);
            Transaction addedTransaction = await _transactionService.Add(newTransaction);
            return Ok(addedTransaction);
        }

        // GET: api/Transaction/{id}
        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            Transaction? existingTransaction = await _transactionService.GetById(id);
            if (existingTransaction == null)
                return NotFound($"No Transaction of id: {id}");
            return Ok(existingTransaction);
        }

        // PUT: api/Transaction/{id}
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Transaction? existingTransaction = await _transactionService.GetById(id);
            if (existingTransaction == null)
                return NotFound($"No Transaction of id: {id}");

            _mapper.Map(transaction, existingTransaction);

            Transaction? updatedTransaction = await _transactionService.Update(existingTransaction);
            return Ok(updatedTransaction);
        }

        // DELETE: api/Transaction/{id}
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = $",{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            Transaction? existingPayment = await _transactionService.GetById(id);
            if (existingPayment == null)
                return NotFound($"No Transaction of id: {id}");

            await _transactionService.DeleteById(id);
            return Ok("Transaction has been deleted Sucessfully!");
        }
    }
}
