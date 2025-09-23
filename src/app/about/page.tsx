export default function About() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Sobre a ARCO</h1>
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            A ARCO é uma plataforma inovadora de afiliados que conecta produtos de qualidade 
            com consumidores através de uma rede inteligente de parceiros.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nossa missão é democratizar o acesso a oportunidades de renda online, 
            fornecendo ferramentas avançadas de análise e otimização para maximizar resultados.
          </p>
        </div>
      </div>
    </div>
  );
}