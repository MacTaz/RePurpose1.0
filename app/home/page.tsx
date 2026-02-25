import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const Home = async () => {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch the profile to get the role
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const role = (profile?.role || 'donor') as 'donor' | 'organization';

    return (
        <div className="min-h-screen bg-white flex flex-col font-['Inter']">
            <Navbar role={role} />

            {role === 'donor' ? (
                /* DONOR VIEW (BLUE THEME) */
                <>
                    {/* Content Area */}
                    <main className="flex-1 p-10 flex gap-8">
                        {/* LEFT: Disaster Watch */}
                        <div className="flex-[1.2] flex flex-col border-[6px] border-[#7BA4D5] rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-[#7BA4D5] px-6 py-3">
                                <h2 className="text-white text-xl font-bold">Disaster Watch</h2>
                            </div>
                            <div className="flex-1 bg-white p-4 flex gap-4">
                                <div className="flex-[3] bg-[#DDE6ED] rounded-lg"></div>
                                <div className="flex-1 flex flex-col gap-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex-1 bg-[#DDE6ED] rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Discover & Recent */}
                        <div className="flex-1 flex flex-col gap-8">
                            {/* Top: Discover Charities */}
                            <div className="flex-[0.6] border-[6px] border-[#7BA4D5] rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-[#7BA4D5] px-6 py-3">
                                    <h2 className="text-white text-xl font-bold">Discover Charities</h2>
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col gap-4">
                                    <div className="bg-[#DDE6ED] h-8 rounded-md w-full"></div>
                                    <div className="bg-[#DDE6ED] h-8 rounded-md w-full"></div>
                                </div>
                            </div>

                            {/* Bottom: Recent Donations */}
                            <div className="flex-1 border-[6px] border-[#7BA4D5] rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-[#7BA4D5] px-6 py-3">
                                    <h2 className="text-white text-xl font-bold">Recent Donations</h2>
                                </div>
                                <div className="flex-1 bg-white p-4">
                                    <div className="bg-[#DDE6ED] w-full h-full rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                /* ORGANIZATION VIEW (ORANGE THEME) */
                <>
                    {/* Content Area */}
                    <main className="flex-1 p-10 flex flex-col gap-8">
                        {/* TOP: Status Management */}
                        <div className="flex-[0.8] border-[6px] border-[#FFB27D] rounded-xl overflow-hidden shadow-sm flex flex-col">
                            <div className="bg-[#FFD1B3] px-6 py-2 border-b-2 border-[#FFB27D]">
                                <h2 className="text-black text-lg font-extrabold">Status Management</h2>
                            </div>
                            <div className="flex-1 bg-white p-5 flex flex-col gap-4">
                                <div className="flex-1 bg-[#FFEDE1] rounded-lg"></div>
                                <div className="flex-1 bg-[#FFEDE1] rounded-lg"></div>
                                <div className="flex-1 bg-[#FFEDE1] rounded-lg"></div>
                            </div>
                        </div>

                        {/* BOTTOM ROW */}
                        <div className="flex-[1.2] flex gap-8">
                            {/* Inventory Needs */}
                            <div className="flex-[0.4] border-[6px] border-[#FFB27D] rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-[#FFD1B3] px-4 py-2 border-b-2 border-[#FFB27D]">
                                    <h2 className="text-black text-lg font-extrabold">Inventory Needs</h2>
                                </div>
                                <div className="flex-1 bg-white p-4 flex flex-col gap-3">
                                    <div className="bg-[#FFEDE1] h-12 rounded-lg"></div>
                                    <div className="bg-[#FFEDE1] h-12 rounded-lg"></div>
                                    <div className="bg-[#FFEDE1] h-12 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Incoming Matches */}
                            <div className="flex-1 border-[6px] border-[#FFB27D] rounded-xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-[#FFD1B3] px-6 py-2 border-b-2 border-[#FFB27D]">
                                    <h2 className="text-black text-lg font-extrabold">Incoming Matches</h2>
                                </div>
                                <div className="flex-1 bg-white p-4">
                                    <div className="bg-[#FFEDE1] w-full h-full rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}

export default Home
