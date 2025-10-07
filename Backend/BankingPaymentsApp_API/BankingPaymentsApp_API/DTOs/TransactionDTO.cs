namespace BankingPaymentsApp_API.DTOs
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public string? AccountNumber { get; set; }
        public string? ClientUserName { get; set; }
        public int? PaymentId { get; set; }          // Use in frontend to determine mode
        public int? SalaryDisbursementId { get; set; } // Use in frontend to determine mode
        public string? ToFrom { get; set; }
        public int TransactionTypeId { get; set; }   // 1=Credit, 2=Debit
        public double Amount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
