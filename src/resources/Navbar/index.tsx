import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Button from '../Button';
import Overlay from './Overlay';
import Navigation from './Navigation';
import MenuToggle from './MenuToggle';

import LogoName from '@/assets/images/logo_name.svg';
import User from '@/assets/icons/icn_user.svg';

import { motion } from 'framer-motion';

const variants = {
  open: {
    right: 0,
    display: 'block',
    transition: {
      type: 'spring',
      stiffness: 80,
    },
  },
  closed: {
    right: -200,
    display: 'none',
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 250,
      display: {
        delay: 0.3,
      },
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsOpen((prev) => !prev);

    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = isOpen ? 'unset' : 'hidden';
    }
  };

  const navbarDesktopLinks = [
    ['Bolsa', '/bolsa'],
    ['Renda Fixa', '/renda-fixa'],
    ['Fundos', '/fundos'],
    ['Plataformas de Trading', '/plataformas'],
    ['Aprenda', '/aprenda'],
    ['Simulador', '/simulador'],
  ];

  const navbarMobileLinks = {
    investimentos: [
      ['Bolsa de Valores', '/bolsa'],
      ['Renda Fixa e Tesouro Direto', '/renda-fixa'],
      ['Fundos de Investimentos', '/fundos'],
      ['Simulador de investimentos', '/simulador'],
    ],
    trading: [
      ['Trading na Toro', '/trader'],
      ['Plataformas de Trading', '/plataformas'],
    ],
    aprenda: [
      ['Cursos', '/aprenda/cursos'],
      ['Estratégias', '/estrategias'],
      ['Conteudos', '/aprenda '],
    ],
  };

  return (
    <section className="sticky -top-1 z-50 px-6 py-3 bg-white lg:shadow-navbar">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <Image src={LogoName} alt="Logo" className="h-full" />
        </Link>

        <nav>
          <ul className="hidden lg:flex flex-wrap content-center text-gray-300 lg:gap-7 xl:gap-10">
            {navbarDesktopLinks.map(([label, link]) => (
              <li key={link} className="hover:text-gray-800 transition duration-300 ease-in-out">
                <Link href={link}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          <Button
            label="Fazer login"
            variant="ghost"
            className="hidden sm:flex"
            icon={<Image src={User} width={0} height={0} alt="Logo" className="h-full" />}
          />
          <Button label="Abra sua conta" variant="outlined" />
          <MenuToggle isOpen={isOpen} toggle={handleNavbarToggle} />
        </div>
      </div>

      {/* Mobile Navbar */}
      <Overlay isOpen={isOpen} onClick={handleNavbarToggle} />

      <motion.aside
        className="fixed top-0 -right-64 bottom-0 bg-white px-8 overflow-y-scroll sm:px-16 py-16 "
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        initial={false}
      >
        <Navigation navbarLinks={navbarMobileLinks} />
      </motion.aside>
    </section>
  );
}
