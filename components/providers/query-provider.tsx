"use client";

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import React, { useState } from 'react';

export function QueryProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider>
            {children}
        </QueryClientProvider>
    );
}
