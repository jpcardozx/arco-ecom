'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Star,
  Shield,
  Zap,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              Contato
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Vamos conversar sobre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                seu sucesso
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa equipe está pronta para ajudar você a alcançar seus objetivos.
              Entre em contato conosco e descubra como podemos transformar sua visão em realidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Entre em contato
                </h2>
                <p className="text-gray-600 text-lg">
                  Estamos aqui para ajudar você. Escolha a melhor forma de nos contatar.
                </p>
              </div>

              {/* Contact Methods - Component 1 */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Telefone</h3>
                        <p className="text-gray-600">+55 (11) 99999-9999</p>
                      </div>
                    </div>

                    <Separator className="bg-gray-200/50" />

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">E-mail</h3>
                        <p className="text-gray-600">contato@arco.com.br</p>
                      </div>
                    </div>

                    <Separator className="bg-gray-200/50" />

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Endereço</h3>
                        <p className="text-gray-600">São Paulo, SP - Brasil</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours - Component 2 */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Horário de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segunda - Sexta</span>
                      <span className="font-medium text-gray-900">9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span className="font-medium text-gray-900">9h - 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium text-gray-900">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time - Component 3 */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Resposta Rápida</h3>
                  </div>
                  <p className="text-gray-600">
                    Respondemos todas as mensagens em até <strong>2 horas</strong> durante
                    o horário comercial.
                  </p>
                </CardContent>
              </Card>

            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Form Card - Component 4 */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    Envie sua mensagem
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Preencha o formulário abaixo e entraremos em contato em breve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name Input - Component 5 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>

                    {/* Email Input - Component 6 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Digite seu e-mail"
                        required
                      />
                    </div>

                    {/* Subject Input - Component 7 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Qual o assunto da sua mensagem?"
                        required
                      />
                    </div>

                    {/* Message Textarea - Component 8 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        placeholder="Descreva como podemos ajudá-lo..."
                        required
                      />
                    </div>

                    {/* Submit Button - Component 9 */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 h-auto text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                  </form>
                </CardContent>
              </Card>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que nos escolher?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 1000 clientes confiam em nossos serviços para impulsionar seus negócios.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Trust Indicator 1 - Component 10 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    100% Seguro
                  </h3>
                  <p className="text-gray-600">
                    Seus dados estão protegidos com criptografia de nível empresarial
                    e total conformidade com a LGPD.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Indicator 2 - Component 11 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    5 estrelas
                  </h3>
                  <p className="text-gray-600">
                    Avaliação média de nossos clientes baseada em mais de
                    500 avaliações verificadas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Indicator 3 - Component 12 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg text-center h-full">
                <CardContent className="p-8">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <HeartHandshake className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Suporte Premium
                  </h3>
                  <p className="text-gray-600">
                    Atendimento personalizado com especialistas dedicados
                    ao seu sucesso.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;