using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<List<Employee>> Get()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<Employee> Get(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task Post([FromBody] Employee value)
        {
            value.CreatedDate = DateTime.Now;
            _context.Employees.Add(value);
            await _context.SaveChangesAsync();
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Employee value)
        {
            Employee employeeToUpdate = await _context.Employees.FindAsync(id);
            employeeToUpdate.Name = value.Name;
            await _context.SaveChangesAsync();
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
