using AutoMapper;
using EmployeeCrudApi.Data;
using EmployeeCrudApi.DTOs;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<EmployeeDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll(string searchText)
        {
            if (!string.IsNullOrEmpty(searchText))
            {
                var employees = await _context.Employees.Where(x => x.Name.StartsWith(searchText)).ToListAsync();
                return Ok(_mapper.Map<List<EmployeeDTO>>(employees));
            }
            else
            {
                var employees = await _context.Employees.ToListAsync();
                return Ok(_mapper.Map<List<EmployeeDTO>>(employees));
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeDTO), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        [HttpPost]
        [ProducesResponseType(typeof(EmployeeDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] EmployeeDTO employee)
        {
            employee.CreatedDate = DateTime.Now;
            var employeeEntity = _mapper.Map<Employee>(employee);
            await _context.Employees.AddAsync(employeeEntity);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return CreatedAtAction(nameof(Create), employee);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] EmployeeDTO employee)
        {
            var employeeToUpdate = _mapper.Map<Employee>(employee);
            try
            {
                _context.Employees.Update(employeeToUpdate);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }
    }
}
