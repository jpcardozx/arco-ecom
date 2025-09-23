/**
 * ARCO Affiliate Marketplace Component
 * Professional e-commerce interface for affiliate marketing
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
import { Badge } from '@/components/design-system/primitives/badge';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Star,
  ExternalLink,
  Filter,
  Search,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS_IMAGES } from '@/lib/unsplash';
import Image from 'next/image';

interface AffiliateProgram {
  id: string;
  name: string;
  platform: 'amazon' | 'magalu' | 'shopee' | 'mercadolivre';
  commission: string;
  categories: string[];
  minPayout: string;
  cookieDuration: string;
  status: 'active' | 'pending' | 'review';
  logo: string;
  description: string;
  features: string[];
}

const affiliatePrograms: AffiliateProgram[] = [
  {
    id: 'amazon-associates',
    name: 'Amazon Associates',
    platform: 'amazon',
    commission: 'Up to 10%',
    categories: ['Electronics', 'Books', 'Fashion', 'Home & Garden'],
    minPayout: 'R$ 50',
    cookieDuration: '24 hours',
    status: 'active',
    logo: '🛒',
    description: 'World\'s largest affiliate program with millions of products',
    features: ['Global reach', 'Trusted brand', 'Advanced analytics', 'Mobile-optimized']
  },
  {
    id: 'magalu-parceiro',
    name: 'Magazine Luiza Parceiro',
    platform: 'magalu',
    commission: 'Up to 8%',
    categories: ['Electronics', 'Fashion', 'Home Appliances', 'Mobile'],
    minPayout: 'R$ 30',
    cookieDuration: '30 days',
    status: 'active',
    logo: '🛍️',
    description: 'Leading Brazilian retailer with strong local presence',
    features: ['Local market leader', 'Fast shipping', 'Brazilian payment methods', 'High conversion']
  },
  {
    id: 'shopee-affiliate',
    name: 'Shopee Affiliate',
    platform: 'shopee',
    commission: 'Up to 12%',
    categories: ['Fashion', 'Beauty', 'Electronics', 'Sports'],
    minPayout: 'R$ 25',
    cookieDuration: '15 days',
    status: 'pending',
    logo: '🎯',
    description: 'Fast-growing platform with competitive commissions',
    features: ['High commission rates', 'Trending products', 'Social commerce', 'Gamification']
  }
];

export const AffiliateMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['all', 'electronics', 'fashion', 'home', 'beauty'];

  const filteredPrograms = affiliatePrograms.filter(program => {
    const matchesCategory = selectedCategory === 'all' || 
      program.categories.some(cat => cat.toLowerCase().includes(selectedCategory));
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Affiliate Marketing Platform
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          Professional Affiliate Marketplace
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Connect with top Brazilian and international affiliate programs. 
          Maximize your revenue with Amazon Associates, Magazine Luiza, Shopee and more.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">3+</div>
              <p className="text-sm text-muted-foreground">Active Programs</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">Up to 12%</div>
              <p className="text-sm text-muted-foreground">Commission</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">1M+</div>
              <p className="text-sm text-muted-foreground">Products</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search affiliate programs..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Affiliate Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{program.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge 
                        variant={program.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {program.status}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
              
              {/* Commission and Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Commission:</span>
                  <span className="font-semibold text-green-600">{program.commission}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Min Payout:</span>
                  <span className="font-medium">{program.minPayout}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cookie Duration:</span>
                  <span className="font-medium">{program.cookieDuration}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {program.categories.slice(0, 3).map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                  {program.categories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{program.categories.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {program.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full group-hover:bg-primary/90 transition-colors"
                disabled={program.status === 'pending'}
              >
                {program.status === 'pending' ? 'Under Review' : 'Join Program'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our affiliate network and start monetizing your audience with premium brands. 
            Get access to exclusive offers, detailed analytics, and dedicated support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Users className="w-4 h-4" />
              Apply as Affiliate
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};