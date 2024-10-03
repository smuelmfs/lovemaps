"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Select from "react-select"; // Adiciona o Select
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import CustomSelect from "./CustomSelect";


// Carregar o mapa dinamicamente para evitar problemas com o SSR do Next.js
const Map = dynamic(() => import("./map.js"), { ssr: false });

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [position, setPosition] = useState([-19.917, -43.934]); // Posição inicial
  const debouncedSearchInput = useDebounce(searchInput, 300); // Debounce de 300ms
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    location: '',
  });

  // Função para buscar os dados com base no input
  const handleSearch = async () => {
    if (debouncedSearchInput) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${debouncedSearchInput}&format=json&limit=5`
        );
        const data = await response.json();

        if (data.length > 0) {
          setSearchResults(
            data.map((result) => ({
              value: result.lat + "," + result.lon,
              label: result.display_name,
            }))
          ); // Armazena os resultados
        } else {
          setSearchResults([]); // Limpa se não houver resultados
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchInput]);

  const handleSelectAddress = (selectedOption) => {
    const [lat, lon] = selectedOption.value.split(","); // Pega lat e lon
    setPosition([parseFloat(lat), parseFloat(lon)]); // Atualiza a posição
    setSearchResults([]);
    setSearchInput("");
  };

  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>Love Maps - Personalized Maps for Couples</title>
        <meta
          name="description"
          content="Create personalized love maps for couples."
        />
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAwevTEWng4wKDTEBj0E9uCHoqyTwa50ng`}
        ></script>
      </Head>
      {/* Header */}
      <header className="bg-gray-50 py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Love Maps</h1>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-700 hover:text-gray-900">
              Sobre
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900">
              Preços
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold">
            Crie mapas do amor personalizados
          </h2>
          <p className="mt-6 text-xl">
            Comemore sua história de amor com um LoveMap personalizado marcando
            os momentos especiais.
          </p>
          <a
            href="#forms"
            className="mt-8 inline-block bg-red-500 px-8 py-4 rounded-lg text-white font-bold text-lg hover:bg-red-600 transition duration-300"
          >
            Criar
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Por que escolher Love Maps?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <svg
                alt="Custom Locations"
                className="w-16 h-16 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M12 2C16.8706 2 21 6.03298 21 10.9258C21 15.8965 16.8033 19.3847 12.927 21.7567C12.6445 21.9162 12.325 22 12 22C11.675 22 11.3555 21.9162 11.073 21.7567C7.2039 19.3616 3 15.9137 3 10.9258C3 6.03298 7.12944 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M9.01498 7.38661C10.0876 6.74692 11.0238 7.00471 11.5863 7.41534C11.8169 7.58371 11.9322 7.66789 12 7.66789C12.0678 7.66789 12.1831 7.58371 12.4137 7.41534C12.9762 7.00471 13.9124 6.74692 14.985 7.38661C16.3928 8.22614 16.7113 10.9958 13.4642 13.3324C12.8457 13.7775 12.5365 14 12 14C11.4635 14 11.1543 13.7775 10.5358 13.3324C7.28869 10.9958 7.60723 8.22614 9.01498 7.38661Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h4 className="text-xl font-semibold mt-6">
                Localicações Customizadas
              </h4>
              <p className="mt-4 text-gray-600">
                Selecione os locais que mais importam em seu relacionamento.
              </p>
            </div>
            <div className="text-center">
              <svg
                alt="Personalized Designs"
                className="w-16 h-16 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M4 8C4 5.17157 4 3.75736 5.00421 2.87868C6.00841 2 7.62465 2 10.8571 2H13.1429C16.3753 2 17.9916 2 18.9958 2.87868C20 3.75736 20 5.17157 20 8V17H4V8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 17H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10.6987 5.56588C11.9289 5.38957 13.9674 5.4601 12.2803 7.15266C10.1715 9.26836 7.00837 14.0289 10.6987 12.4421C14.3891 10.8554 15.9709 11.9132 14.3893 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 17V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M5 22L8 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19 22L16 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h4 className="text-xl font-semibold mt-6">
                Designs Personalizados
              </h4>
              <p className="mt-4 text-gray-600">
                Personalize seu mapa com designs e temas exclusivos.
              </p>
            </div>
            <div className="text-center">
              <svg
                alt="High-Quality Prints"
                className="w-16 h-16 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M7.35396 18C5.23084 18 4.16928 18 3.41349 17.5468C2.91953 17.2506 2.52158 16.8271 2.26475 16.3242C1.87179 15.5547 1.97742 14.5373 2.18868 12.5025C2.36503 10.8039 2.45321 9.95455 2.88684 9.33081C3.17153 8.92129 3.55659 8.58564 4.00797 8.35353C4.69548 8 5.58164 8 7.35396 8H16.646C18.4184 8 19.3045 8 19.992 8.35353C20.4434 8.58564 20.8285 8.92129 21.1132 9.33081C21.5468 9.95455 21.635 10.8039 21.8113 12.5025C22.0226 14.5373 22.1282 15.5547 21.7352 16.3242C21.4784 16.8271 21.0805 17.2506 20.5865 17.5468C19.8307 18 18.7692 18 16.646 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.9887 16L10.0113 16C9.32602 16 8.98337 16 8.69183 16.1089C8.30311 16.254 7.97026 16.536 7.7462 16.9099C7.57815 17.1904 7.49505 17.5511 7.32884 18.2724C7.06913 19.3995 6.93928 19.963 7.02759 20.4149C7.14535 21.0174 7.51237 21.5274 8.02252 21.7974C8.40513 22 8.94052 22 10.0113 22L13.9887 22C15.0595 22 15.5949 22 15.9775 21.7974C16.4876 21.5274 16.8547 21.0174 16.9724 20.4149C17.0607 19.963 16.9309 19.3995 16.6712 18.2724C16.505 17.5511 16.4218 17.1904 16.2538 16.9099C16.0297 16.536 15.6969 16.254 15.3082 16.1089C15.0166 16 14.674 16 13.9887 16Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 12H18.009"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h4 className="text-xl font-semibold mt-6">
                Impressões de alta qualidade
              </h4>
              <p className="mt-4 text-gray-600">
                Obtenha uma versão digital ou uma impressão emoldurada para sua
                casa.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Formulário para buscar localização e criar o mapa */}
<section className="relative bg-gray-900 text-white py-12" id="forms">
  <div className="form-map-container flex flex-col lg:flex-row justify-between gap-8 px-4">
    
    {/* Formulário */}
    <div className="form-container w-full max-w-lg">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome do casal
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Samuel e Nathalia"
            required
          />
        </div>
        <div>
          <label
            htmlFor="date_met"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Data em que se conheceram
          </label>
          <input
            type="date"
            id="date_met"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="LocationInput"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Localização
          </label>
          {/* Campo de busca */}
          <div className="w-full">
            <div className="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <CustomSelect
                options={searchResults}
                onInputChange={setSearchInput}
                onChange={handleSelectAddress}
                placeholder="Digite um endereço"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sua mensagem
          </label>
          <textarea
            id="message"
            rows="3"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escreva aqui sua mensagem..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Gerar mapa personalizado
        </button>
      </form>
    </div>

    {/* Mapa */}
    <div className="w-full lg:w-2/3 xl:w-1/2 h-56 lg:h-64 bg-gray-200">
      <Map position={position} />
    </div>

    {/* Preview Section */}
    <section id="preview" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Pré-visualização do Mapa
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold">Título:</h4>
              <p>{formData.title || "Nenhum título definido"}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Mensagem:</h4>
              <p>{formData.message || "Nenhuma mensagem definida"}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Localização:</h4>
              <p>{formData.location || "Nenhuma localização selecionada"}</p>
            </div>

            {/* Exibe o mapa com a posição selecionada */}
            <div>
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>{formData.location || "Localização não definida"}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
  </div>
</section>



      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-12">
            Perguntas Frequentes (FAQ)
          </h3>
          <p className="text-lg">
            colocar perguntas que qualquer usuário faria
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-gray-900 text-white px-8 py-4 rounded-lg"
          >
            Criar meu LoveMap
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; 2024 Love Maps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
