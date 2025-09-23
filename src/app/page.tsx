import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center container mx-auto px-4">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    ARCO
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                    Plataforma de Afiliados Inteligente
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Começar Agora
                    </Button>
                    <Button variant="outline" size="lg">
                        Saiba Mais
                    </Button>
                </div>
            </div>
        </div>
    );
}
