"use client";
// use client prevents server side rendering of modals

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { useEffect, useState } from "react";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export function ModalProvider() {
    // The following 3 portions of code prevent hydration errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
        </>
    )
}
