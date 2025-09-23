/**
 * ARCO Grid System
 * Responsive grid layout with design token integration
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
    children: React.ReactNode;
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    responsive?: {
        sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
        md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
        lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
        xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    };
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    className?: string;
}

interface GridItemProps {
    children: React.ReactNode;
    span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    responsive?: {
        sm?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 };
        md?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 };
        lg?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 };
        xl?: { span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 };
    };
    className?: string;
}

const getColsClass = (cols: number, prefix = '') => {
    const baseClass = prefix ? `${prefix}:grid-cols-` : 'grid-cols-';
    return `${baseClass}${cols}`;
};

const getGapClass = (gap: string) => {
    const gapMap = {
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12'
    };
    return gapMap[gap as keyof typeof gapMap] || 'gap-6';
};

const getAlignClass = (align: string) => {
    const alignMap = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    };
    return alignMap[align as keyof typeof alignMap] || '';
};

const getJustifyClass = (justify: string) => {
    const justifyMap = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
    };
    return justifyMap[justify as keyof typeof justifyMap] || '';
};

const getSpanClass = (span: number, prefix = '') => {
    const baseClass = prefix ? `${prefix}:col-span-` : 'col-span-';
    return `${baseClass}${span}`;
};

const getOffsetClass = (offset: number, prefix = '') => {
    const baseClass = prefix ? `${prefix}:col-start-` : 'col-start-';
    return `${baseClass}${offset + 1}`;
};

export const Grid: React.FC<GridProps> = ({
    children,
    cols = 12,
    gap = 'md',
    responsive,
    align,
    justify,
    className = ''
}) => {
    const classes = cn(
        'grid',
        getColsClass(cols),
        getGapClass(gap),
        align && getAlignClass(align),
        justify && getJustifyClass(justify),
        responsive?.sm && getColsClass(responsive.sm, 'sm'),
        responsive?.md && getColsClass(responsive.md, 'md'),
        responsive?.lg && getColsClass(responsive.lg, 'lg'),
        responsive?.xl && getColsClass(responsive.xl, 'xl'),
        className
    );

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export const GridItem: React.FC<GridItemProps> = ({
    children,
    span,
    offset,
    responsive,
    className = ''
}) => {
    const classes = cn(
        span && getSpanClass(span),
        offset && getOffsetClass(offset),
        responsive?.sm?.span && getSpanClass(responsive.sm.span, 'sm'),
        responsive?.sm?.offset && getOffsetClass(responsive.sm.offset, 'sm'),
        responsive?.md?.span && getSpanClass(responsive.md.span, 'md'),
        responsive?.md?.offset && getOffsetClass(responsive.md.offset, 'md'),
        responsive?.lg?.span && getSpanClass(responsive.lg.span, 'lg'),
        responsive?.lg?.offset && getOffsetClass(responsive.lg.offset, 'lg'),
        responsive?.xl?.span && getSpanClass(responsive.xl.span, 'xl'),
        responsive?.xl?.offset && getOffsetClass(responsive.xl.offset, 'xl'),
        className
    );

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export type { GridProps, GridItemProps };
