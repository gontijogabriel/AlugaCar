'use client'


export default function Home() {

  return (
    <>
      <main className="container mx-auto px-4 lg:px-8 py-6">
        
          <div class="bg-white dark:bg-gray-800 flex relative items-center overflow-hidden">
            <div class="container mx-auto px-6 flex relative py-16">
              <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative">
                <h1 class="font-bebas-neue uppercase text-5xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  Alugue Carros Premium 
                  <span class="text-5xl">
                  Com Conforto e Estilo
                  </span>
                </h1>
                <p class="text-sm sm:text-base text-gray-700 dark:text-white py-4">
                Bem-vindo à AlugaCar, sua plataforma de confiança para alugar carros premium. Explore nossa seleção exclusiva de veículos de luxo, perfeitos para qualquer ocasião. Reserve seu carro ideal com facilidade e experimente o máximo em conforto, desempenho e estilo. Seja para uma viagem especial ou para o dia a dia, nós temos o carro perfeito para você.
                </p>
                <div class="flex mt-8">
                  <a href="/cars" class="uppercase py-2 px-4 rounded-lg bg-blue-600 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-400">
                    Get started
                  </a>
                  <a href="/auth/register" class="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-blue-600 text-blue-600 dark:text-white hover:bg-blue-700 hover:text-white text-md">
                    Register
                  </a>
                </div>
              </div>
              <div class="hidden sm:flex sm:items-center sm:w-1/3 lg:w-3/5 relative">
                <img src="https://www.largus.fr/images/styles/diaporama_viewer/public/images/porsche-911-gt2-rs-2018-10.png?itok=PJKp6JPl"  />
              </div>
            </div>
          </div>

         {/* https://www.largus.fr/actualite-automobile/prix-porsche-911-gt2-rs-configurez-la-votre-cest-gratuit-8625390-10569024-photos.html#photos-main-title-anchor  */}
          <img className="hidden" src="https://www.largus.fr/images/styles/diaporama_viewer/public/images/porsche-911-gt2-rs-2018-14.png?itok=wMUnx2nQ"></img>
      </main>
    </>
  );
}
