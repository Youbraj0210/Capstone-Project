namespace BankingPaymentsApp_API.DTOs
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public string? AccountNumber { get; set; }
        public string? ClientUserName { get; set; }
        public int? PaymentId { get; set; }         
        public int? SalaryDisbursementId { get; set; } 
        public string? ToFrom { get; set; }
        public int TransactionTypeId { get; set; }  
        public double Amount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
