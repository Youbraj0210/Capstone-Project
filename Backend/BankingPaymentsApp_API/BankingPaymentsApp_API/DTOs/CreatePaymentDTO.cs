namespace BankingPaymentsApp_API.DTOs
{
    public class CreatePaymentDTO
    {
        public long Amount { get; set; } 
        public int AccountId { get; set; }
    }
}
