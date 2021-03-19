using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminsController : BaseApiController
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        public AdminsController(IAdminRepository adminRepository, IMapper mapper)
        {
            _mapper = mapper;
            _adminRepository = adminRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PublicAdminDTO>>> GetAdmins(int adminId)
        {
            var admins = await _adminRepository.GetAdminsAsync();
            return Ok(
                _mapper.Map<IEnumerable<PublicAdminDTO>>(admins)
            );
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<PublicAdminDTO>> GetAdmin(string username)
        {
            return await _adminRepository.GetAdminByUsernameAsync(username);
        }

        [HttpGet("{username}/{pictureId}")]
        public async Task<ActionResult<PictureDTO>> GetPictureFromAdminAsync(string username, int pictureId)
        {
            return _mapper.Map<PictureDTO>(await _adminRepository.GetPictureFromAdminAsync(username, pictureId));
        }
    }
}