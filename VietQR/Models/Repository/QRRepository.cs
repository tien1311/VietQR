using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using EasyInvoice.Json;
using System.Data.SqlClient;
using Dapper;

namespace VietQR.Models.Repository
{
    public class QRRepository
    {
        string SQL_EV_MAIN_V2 = "Data Source=42.117.7.18,1344;Initial Catalog=INHOPDONG_V2;User ID=sa;Password=EnViet@123;";
        public async Task<bool> insertBank()
        {
            try
            {
                HttpClient client = new HttpClient();
                // Define the API endpoint URL
                string apiUrl = "https://api.vietqr.io/v2/banks"; // Replace with your API URL

                // Make a GET request to the API
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Read the response content as a string
                    string responseBody = await response.Content.ReadAsStringAsync();
                    APIBankModel model = JsonConvert.DeserializeObject<APIBankModel>(responseBody);
                    // Do something with the response data
                    bool result = Insert(model);
                }
                else
                {
                    // Handle the error, e.g., log or display an error message
                    Console.WriteLine("Error: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
            }
            return true;
        }
        public bool Insert(APIBankModel model)
        {
            int z = 0;
            string sql = "";
            for (int i = 0; i < model.data.Count; i++)
            {
                sql += "INSERT INTO [BANK] ([Code],[Name],[Bin],[ShortName],[Logo],[Swift_code])VALUES ('" + model.data[i].Code + "',N'" + model.data[i].Name + "','" + model.data[i].Bin + "','" + model.data[i].ShortName + "','" + model.data[i].Logo + "','" + model.data[i].Swift_code + "')";
            }
            using (var conn = new SqlConnection(SQL_EV_MAIN_V2))
            {
                z = conn.Execute(sql, null, null, commandTimeout: 30, commandType: System.Data.CommandType.Text);
                conn.Dispose();
            }
            if (z > 0)
            {
                return true;
            }
            else
                return false;
        }
        public List<Bank> ListBank()
        {
            List<Bank> result = new List<Bank>();
            string sql = @"select * from BANK order by ShortName";
            using (var conn = new SqlConnection(SQL_EV_MAIN_V2))
            {
                result = (List<Bank>)conn.Query<Bank>(sql, null, commandType: System.Data.CommandType.Text, commandTimeout: 30);
                conn.Dispose();
            }
            return result;
        }
        public List<Bank> ListBank_EV()
        {
            List<Bank> result = new List<Bank>();
            string sql = @"select BANK.* from BANK_ACCOUNT_EV Bank_EV left join BANK on Bank_EV.IDBank = BANK.ID order by Bank_EV.Position";
            using (var conn = new SqlConnection(SQL_EV_MAIN_V2))
            {
                result = (List<Bank>)conn.Query<Bank>(sql, null, commandType: System.Data.CommandType.Text, commandTimeout: 30);
                conn.Dispose();
            }
            return result;
        }
        public Account_Bank_EV Account_Bank_EV(int Bin)
        {
            Account_Bank_EV result = new Account_Bank_EV();
            string sql = @"select Bank_EV.* from BANK_ACCOUNT_EV Bank_EV left join BANK on Bank_EV.IDBank = BANK.ID where BANK.Bin = '"+ Bin + "'";
            using (var conn = new SqlConnection(SQL_EV_MAIN_V2))
            {
                result = (Account_Bank_EV)conn.QueryFirst<Account_Bank_EV>(sql, null, commandType: System.Data.CommandType.Text, commandTimeout: 30);
                conn.Dispose();
            }
            return result;
        }
    }
}
