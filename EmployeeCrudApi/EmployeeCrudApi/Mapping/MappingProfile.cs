using AutoMapper;
using EmployeeCrudApi.DTOs;
using EmployeeCrudApi.Models;

namespace EmployeeCrudApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDTO, Employee>().ReverseMap();
        }
    }
}
