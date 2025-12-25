'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Sidebar from '@/components/common/Sidebar';
import QueueRegistration from '@/components/queue/QueueRegistration';
import AvailableHospitals from '@/components/queue/AvailableHospitals';
import ActiveQueues from '@/components/queue/ActiveQueues';
import { User } from '@/types/Queue';
import { queueService } from '@/utils/apiService';
import { useState, useEffect } from 'react';

export default function HospitalQueueManager() {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"queues" | "hospitals">(
		"hospitals"
	);


  useEffect(() => {
    const savedUser = localStorage.getItem('queueUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const { data: hospitals = [] } = useQuery({
    queryKey: ['hospitals'],
    queryFn: queueService.getHospitals,
    enabled: !!user,
  });

const { data: userQueues = null } = useQuery({
	queryKey: ["queue", user?.id],
	queryFn: () => queueService.getUserQueueData(user!.id),
	enabled: !!user,
});

  const { data: queues = [] } = useQuery({
    queryKey: ['queues'],
    queryFn: queueService.getQueues,
    enabled: !!user,
  });

  const registerMutation = useMutation({
    mutationFn: queueService.registerUser,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('queueUser', JSON.stringify(data));
    },
  });

  const joinQueueMutation = useMutation({
    mutationFn: queueService.joinQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queues', user!.id] });
      queryClient.invalidateQueries({ queryKey: ['hospitals'] });
    },
  });

  const handleRegister = (data: {
		hospital: number;
		first_name: string;
		last_name: string;
		email: string;
		phone: string;
		address: string;
		date_of_birth: string;
		status: string;
		patient_id: string;
	}) => {
    registerMutation.mutate(data);
  };

  const handleJoinQueue = (hospitalId: number) => {
    if (!user) return;
    joinQueueMutation.mutate({
			queue_status: "WAITING",
			patient: user.id,
			hospital: hospitalId,
		});
  };

  if (!user) {
    return (
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-linear-to-br from-primary/5 to-secondary/5">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
            <div className="flex flex-col justify-center h-10">
              <h2 className="text-lg font-bold text-gray-900">Queue Manager</h2>
              <p className="text-xs text-gray-500">Register to join hospital queues</p>
            </div>
          </header>
          <div className="flex-1 flex items-center justify-center p-4">
            <QueueRegistration onRegister={handleRegister} />
          </div>
        </div>
      </div>
    );
  }

  return (
		<div className="h-full lg:h-screen flex">
			<Sidebar />
			<div className="flex-1 flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
				<header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-lg font-bold text-gray-900">Queue Manager</h2>
							<p className="text-xs text-gray-500">
								Welcome back, {user.first_name} {user.last_name}👋
							</p>
						</div>
						<div className="flex items-center gap-2 bg-linear-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
							<span className="text-xs font-medium text-gray-700 hidden md:block">
								Live Updates
							</span>
							<span className="text-xs font-medium text-gray-700 md:hidden">
								Live
							</span>
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						</div>
					</div>
				</header>
				<div className="flex-1 overflow-y-auto p-6 min-h-screen">
					<div className="flex gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm w-fit">
						<button
							onClick={() => setActiveTab("hospitals")}
							className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
								activeTab === "hospitals"
									? "bg-primary text-white shadow"
									: "text-gray-600 hover:bg-gray-100"
							}`}
						>
							Available Hospitals
						</button>

						<button
							onClick={() => setActiveTab("queues")}
							className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
								activeTab === "queues"
									? "bg-primary text-white shadow"
									: "text-gray-600 hover:bg-gray-100"
							}`}
						>
							My Queues <span className='text-red-500'>{userQueues ? `*` : ""}</span>
						</button>
					</div>

					<div className="h-full">
						{activeTab === "queues" && (
							<ActiveQueues activeQueue={userQueues} />
						)}

						{activeTab === "hospitals" && (
							<AvailableHospitals
								hospitals={hospitals}
								queues={queues}
								loading={joinQueueMutation.isPending}
								onJoinQueue={handleJoinQueue}
								currentPatientId={userQueues?.patient.id}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
