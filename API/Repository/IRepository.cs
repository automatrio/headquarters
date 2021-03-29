using System.Threading.Tasks;

namespace API.Repository
{
    public interface IRepository
    {
        Task<bool> SaveAllChangesAsync();
    }
}