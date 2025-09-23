'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/design-system/primitives/card';
import { Button } from '@/components/design-system/primitives/button';
import { Badge } from '@/components/design-system/primitives/badge';
import { Shield, UserCheck, LogIn } from 'lucide-react';

// Check if user is approved affiliate (mock for now - replace with DB check)
const useAffiliateStatus = (userId?: string) => {
  // This would normally check against your database
  // For demo purposes, we'll approve all GitHub users
  return { isAffiliate: true, loading: false };
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { isAffiliate, loading: affiliateLoading } = useAffiliateStatus(session?.user?.id);
  const router = useRouter();

  if (status === 'loading' || affiliateLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Acesso Restrito</h2>
              <p className="text-muted-foreground">
                Esta área é exclusiva para afiliados aprovados. Faça login para continuar.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => router.push('/auth/signin')}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Fazer Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/ecommerce/affiliate/signup')}
              >
                Tornar-se Afiliado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAffiliate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Aprovação Pendente</h2>
              <p className="text-muted-foreground">
                Sua solicitação para se tornar afiliado está sendo analisada. Você receberá um email em até 24h.
              </p>
            </div>
            <Badge variant="secondary" className="text-yellow-600 bg-yellow-100">
              Aguardando Aprovação
            </Badge>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/ecommerce')}
            >
              Voltar ao Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}