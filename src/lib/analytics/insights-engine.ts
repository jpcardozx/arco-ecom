/**
 * ARCO Analytics Insights Engine
 * Sistema de inteligência artificial para análise de dados e geração de insights
 */

export interface TrafficData {
  source: string;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  conversions: number;
  revenue: number;
  timestamp: Date;
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  startDate: Date;
  endDate?: Date;
}

export interface Insight {
  id: string;
  type: 'performance' | 'optimization' | 'trend' | 'alert' | 'recommendation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  confidence: number;
  impact: number;
  actionable: boolean;
  metadata: Record<string, any>;
  timestamp: Date;
}

export class AnalyticsInsightsEngine {
  private trafficHistory: TrafficData[] = [];
  private campaignHistory: CampaignData[] = [];
  private insights: Insight[] = [];

  /**
   * Adiciona dados de tráfego para análise
   */
  addTrafficData(data: TrafficData[]): void {
    this.trafficHistory.push(...data);
    this.generateInsights();
  }

  /**
   * Adiciona dados de campanha para análise
   */
  addCampaignData(data: CampaignData[]): void {
    this.campaignHistory.push(...data);
    this.generateInsights();
  }

  /**
   * Gera insights automaticamente baseado nos dados disponíveis
   */
  private generateInsights(): void {
    this.insights = [];

    // Análise de performance ROAS
    this.analyzeROASPerformance();

    // Análise de tendências de CTR
    this.analyzeCTRTrends();

    // Análise de otimização de CPC
    this.analyzeCPCOptimization();

    // Análise de sazonalidade
    this.analyzeSeasonality();

    // Detecção de anomalias
    this.detectAnomalies();

    // Recomendações de orçamento
    this.analyzeBudgetOptimization();
  }

  /**
   * Análise de performance ROAS
   */
  private analyzeROASPerformance(): void {
    const recentCampaigns = this.campaignHistory.filter(
      c => this.isWithinLastDays(c.startDate, 30)
    );

    for (const campaign of recentCampaigns) {
      const roas = campaign.spent > 0 ? campaign.revenue / campaign.spent : 0;

      if (roas > 4.0) {
        this.insights.push({
          id: `roas-high-${campaign.id}`,
          type: 'performance',
          severity: 'high',
          title: `ROAS Excepcional: ${campaign.name}`,
          description: `Campanha apresenta ROAS de ${roas.toFixed(2)}x, significativamente acima da média.`,
          recommendation: `Considere aumentar o orçamento desta campanha em 30-50% para maximizar retorno.`,
          confidence: 95,
          impact: 85,
          actionable: true,
          metadata: { campaignId: campaign.id, roas, avgROAS: 2.5 },
          timestamp: new Date()
        });
      } else if (roas < 1.5) {
        this.insights.push({
          id: `roas-low-${campaign.id}`,
          type: 'alert',
          severity: 'critical',
          title: `ROAS Baixo: ${campaign.name}`,
          description: `Campanha apresenta ROAS de apenas ${roas.toFixed(2)}x, abaixo do threshold mínimo.`,
          recommendation: `Revise palavras-chave, landing pages e segmentação. Considere pausar temporariamente.`,
          confidence: 90,
          impact: 75,
          actionable: true,
          metadata: { campaignId: campaign.id, roas, minROAS: 1.5 },
          timestamp: new Date()
        });
      }
    }
  }

  /**
   * Análise de tendências de CTR
   */
  private analyzeCTRTrends(): void {
    const recentTraffic = this.trafficHistory.filter(
      t => this.isWithinLastDays(t.timestamp, 14)
    );

    if (recentTraffic.length < 7) return;

    const avgCTR = recentTraffic.reduce((sum, t) => sum + t.ctr, 0) / recentTraffic.length;
    const last3Days = recentTraffic.slice(-3);
    const recentCTR = last3Days.reduce((sum, t) => sum + t.ctr, 0) / last3Days.length;

    const ctrChange = ((recentCTR - avgCTR) / avgCTR) * 100;

    if (ctrChange > 15) {
      this.insights.push({
        id: 'ctr-increase',
        type: 'trend',
        severity: 'medium',
        title: 'Melhoria Significativa no CTR',
        description: `CTR aumentou ${ctrChange.toFixed(1)}% nos últimos 3 dias.`,
        recommendation: 'Analise quais elementos contribuíram para esta melhoria e replique em outras campanhas.',
        confidence: 87,
        impact: 65,
        actionable: true,
        metadata: { ctrChange, avgCTR, recentCTR },
        timestamp: new Date()
      });
    } else if (ctrChange < -10) {
      this.insights.push({
        id: 'ctr-decrease',
        type: 'alert',
        severity: 'high',
        title: 'Queda no CTR Detectada',
        description: `CTR reduziu ${Math.abs(ctrChange).toFixed(1)}% nos últimos 3 dias.`,
        recommendation: 'Revise criativos, headlines e segmentação. Teste novos elementos.',
        confidence: 85,
        impact: 70,
        actionable: true,
        metadata: { ctrChange, avgCTR, recentCTR },
        timestamp: new Date()
      });
    }
  }

  /**
   * Análise de otimização de CPC
   */
  private analyzeCPCOptimization(): void {
    const trafficBySources = this.groupTrafficBySource();

    Object.entries(trafficBySources).forEach(([source, data]) => {
      const avgCPC = data.reduce((sum, t) => sum + t.cpc, 0) / data.length;
      const avgConversions = data.reduce((sum, t) => sum + t.conversions, 0) / data.length;

      if (avgCPC > 2.5 && avgConversions < 5) {
        this.insights.push({
          id: `cpc-optimization-${source}`,
          type: 'optimization',
          severity: 'medium',
          title: `Oportunidade de Otimização CPC - ${source}`,
          description: `Fonte ${source} apresenta CPC alto (R$ ${avgCPC.toFixed(2)}) com baixas conversões.`,
          recommendation: 'Considere palavras-chave de cauda longa, ajuste de lances ou melhor segmentação.',
          confidence: 78,
          impact: 60,
          actionable: true,
          metadata: { source, avgCPC, avgConversions },
          timestamp: new Date()
        });
      }
    });
  }

  /**
   * Análise de sazonalidade
   */
  private analyzeSeasonality(): void {
    const trafficByHour = this.groupTrafficByHour();
    const peakHours = this.findPeakHours(trafficByHour);

    if (peakHours.length > 0) {
      this.insights.push({
        id: 'seasonality-hours',
        type: 'trend',
        severity: 'medium',
        title: 'Padrão de Sazonalidade Identificado',
        description: `Conversões são ${peakHours[0].improvement}% maiores entre ${peakHours[0].hour}h.`,
        recommendation: `Concentre maior orçamento nos horários de pico: ${peakHours.map(h => h.hour + 'h').join(', ')}.`,
        confidence: 82,
        impact: 55,
        actionable: true,
        metadata: { peakHours },
        timestamp: new Date()
      });
    }

    const weekendPerformance = this.analyzeWeekendPerformance();
    if (weekendPerformance.significant) {
      this.insights.push({
        id: 'seasonality-weekend',
        type: 'trend',
        severity: 'low',
        title: 'Comportamento Diferenciado em Finais de Semana',
        description: `Performance ${weekendPerformance.change > 0 ? 'melhora' : 'piora'} ${Math.abs(weekendPerformance.change).toFixed(1)}% em weekends.`,
        recommendation: weekendPerformance.change > 0
          ? 'Considere aumentar orçamento de weekend.'
          : 'Reduza orçamento em finais de semana e realoque para dias úteis.',
        confidence: 75,
        impact: 45,
        actionable: true,
        metadata: weekendPerformance,
        timestamp: new Date()
      });
    }
  }

  /**
   * Detecção de anomalias
   */
  private detectAnomalies(): void {
    const recentTraffic = this.trafficHistory.slice(-7);
    const historicalAvg = this.calculateHistoricalAverages();

    for (const traffic of recentTraffic) {
      // Anomalia em impressões
      const impressionDeviation = Math.abs(traffic.impressions - historicalAvg.impressions) / historicalAvg.impressions;
      if (impressionDeviation > 0.3) {
        this.insights.push({
          id: `anomaly-impressions-${traffic.timestamp.getTime()}`,
          type: 'alert',
          severity: traffic.impressions > historicalAvg.impressions ? 'medium' : 'high',
          title: `Anomalia em Impressões - ${traffic.source}`,
          description: `Impressões ${traffic.impressions > historicalAvg.impressions ? 'aumentaram' : 'diminuíram'} ${(impressionDeviation * 100).toFixed(1)}% em relação à média.`,
          recommendation: 'Investigue possíveis causas: mudanças em lances, orçamento ou problemas técnicos.',
          confidence: 88,
          impact: 65,
          actionable: true,
          metadata: { source: traffic.source, current: traffic.impressions, historical: historicalAvg.impressions },
          timestamp: new Date()
        });
      }
    }
  }

  /**
   * Análise de otimização de orçamento
   */
  private analyzeBudgetOptimization(): void {
    const activeCampaigns = this.campaignHistory.filter(c => c.status === 'active');

    for (const campaign of activeCampaigns) {
      const spentPercentage = (campaign.spent / campaign.budget) * 100;
      const roas = campaign.spent > 0 ? campaign.revenue / campaign.spent : 0;

      if (spentPercentage > 90 && roas > 3.0) {
        this.insights.push({
          id: `budget-increase-${campaign.id}`,
          type: 'recommendation',
          severity: 'high',
          title: `Oportunidade de Aumento de Orçamento - ${campaign.name}`,
          description: `Campanha consumiu ${spentPercentage.toFixed(1)}% do orçamento com ROAS de ${roas.toFixed(2)}x.`,
          recommendation: `Considere aumentar orçamento em 40-60% para maximizar retorno desta campanha performática.`,
          confidence: 92,
          impact: 80,
          actionable: true,
          metadata: { campaignId: campaign.id, spentPercentage, roas, currentBudget: campaign.budget },
          timestamp: new Date()
        });
      } else if (spentPercentage < 50 && roas < 2.0) {
        this.insights.push({
          id: `budget-reallocation-${campaign.id}`,
          type: 'optimization',
          severity: 'medium',
          title: `Realocação de Orçamento Recomendada - ${campaign.name}`,
          description: `Campanha utilizou apenas ${spentPercentage.toFixed(1)}% do orçamento com baixo ROAS.`,
          recommendation: `Considere realocar parte do orçamento para campanhas mais performáticas.`,
          confidence: 85,
          impact: 60,
          actionable: true,
          metadata: { campaignId: campaign.id, spentPercentage, roas, currentBudget: campaign.budget },
          timestamp: new Date()
        });
      }
    }
  }

  /**
   * Métodos auxiliares
   */
  private isWithinLastDays(date: Date, days: number): boolean {
    const diffTime = Math.abs(new Date().getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  }

  private groupTrafficBySource(): Record<string, TrafficData[]> {
    return this.trafficHistory.reduce((acc, traffic) => {
      if (!acc[traffic.source]) acc[traffic.source] = [];
      acc[traffic.source].push(traffic);
      return acc;
    }, {} as Record<string, TrafficData[]>);
  }

  private groupTrafficByHour(): Record<number, TrafficData[]> {
    return this.trafficHistory.reduce((acc, traffic) => {
      const hour = traffic.timestamp.getHours();
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(traffic);
      return acc;
    }, {} as Record<number, TrafficData[]>);
  }

  private findPeakHours(trafficByHour: Record<number, TrafficData[]>): Array<{hour: number, improvement: number}> {
    const hourlyAvgs = Object.entries(trafficByHour).map(([hour, data]) => ({
      hour: parseInt(hour),
      avgConversions: data.reduce((sum, t) => sum + t.conversions, 0) / data.length
    }));

    const overallAvg = hourlyAvgs.reduce((sum, h) => sum + h.avgConversions, 0) / hourlyAvgs.length;

    return hourlyAvgs
      .filter(h => h.avgConversions > overallAvg * 1.2)
      .map(h => ({
        hour: h.hour,
        improvement: ((h.avgConversions - overallAvg) / overallAvg) * 100
      }))
      .sort((a, b) => b.improvement - a.improvement)
      .slice(0, 3);
  }

  private analyzeWeekendPerformance(): {change: number, significant: boolean} {
    const weekdayTraffic = this.trafficHistory.filter(t => {
      const day = t.timestamp.getDay();
      return day >= 1 && day <= 5;
    });

    const weekendTraffic = this.trafficHistory.filter(t => {
      const day = t.timestamp.getDay();
      return day === 0 || day === 6;
    });

    if (weekdayTraffic.length === 0 || weekendTraffic.length === 0) {
      return { change: 0, significant: false };
    }

    const weekdayAvg = weekdayTraffic.reduce((sum, t) => sum + t.conversions, 0) / weekdayTraffic.length;
    const weekendAvg = weekendTraffic.reduce((sum, t) => sum + t.conversions, 0) / weekendTraffic.length;

    const change = ((weekendAvg - weekdayAvg) / weekdayAvg) * 100;
    const significant = Math.abs(change) > 15;

    return { change, significant };
  }

  private calculateHistoricalAverages(): {impressions: number, clicks: number, conversions: number} {
    const historical = this.trafficHistory.slice(0, -7); // Exclui últimos 7 dias

    if (historical.length === 0) {
      return { impressions: 0, clicks: 0, conversions: 0 };
    }

    return {
      impressions: historical.reduce((sum, t) => sum + t.impressions, 0) / historical.length,
      clicks: historical.reduce((sum, t) => sum + t.clicks, 0) / historical.length,
      conversions: historical.reduce((sum, t) => sum + t.conversions, 0) / historical.length
    };
  }

  /**
   * Métodos públicos para obter insights
   */
  getInsights(): Insight[] {
    return [...this.insights].sort((a, b) => {
      // Ordena por severidade e depois por impacto
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.impact - a.impact;
    });
  }

  getInsightsByType(type: Insight['type']): Insight[] {
    return this.insights.filter(insight => insight.type === type);
  }

  getActionableInsights(): Insight[] {
    return this.insights.filter(insight => insight.actionable);
  }

  getInsightById(id: string): Insight | undefined {
    return this.insights.find(insight => insight.id === id);
  }

  /**
   * Remove insights antigos (mais de 30 dias)
   */
  cleanupOldInsights(): void {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    this.insights = this.insights.filter(
      insight => insight.timestamp > thirtyDaysAgo
    );
  }
}

// Export singleton instance
export const insightsEngine = new AnalyticsInsightsEngine();