import { useNavigate } from "react-router-dom";
import ProfileForm from "../../features/profile/profileEditForm";

function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold"></h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition"
        >
          Voltar
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Perfil do Estudante</h1>
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;
