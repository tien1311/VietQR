using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VietQR.Models;
using VietQR.Models.Repository;

namespace VietQR.Controllers
{
    public class QRController : Controller
    {
        QRRepository QR_Rep = new QRRepository();
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Account_Bank_EV(int Bin)
        {
            Account_Bank_EV result = QR_Rep.Account_Bank_EV(Bin);
            return Json(result);
        }
    }
}
