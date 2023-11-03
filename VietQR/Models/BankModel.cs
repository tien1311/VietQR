using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VietQR.Models
{
    public class APIBankModel
    {
        public string code { get; set; }
        public string desc { get; set; }
        public List<Bank> data { get; set; }
    }
    public class Bank
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Bin { get; set; }
        public string ShortName { get; set; }
        public string Logo { get; set; }
        public string Swift_code { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
    }
    public class Account_Bank_EV
    {
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
    }
}
