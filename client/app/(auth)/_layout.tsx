import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name="log-out-outline" size={24} color={'#fff'} />
		</Pressable>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	return (
		<Tabs
			// screenOptions={{
			// 	headerStyle: {
			// 		backgroundColor: '#6c47ff'
			// 	},
			// 	headerTintColor: '#fff'
			// }}
		>
			<Tabs.Screen
				name="ProfileSection"
				options={{
					headerShown: false,
					// headerTitle: 'Plant Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" size={size} color={"white"} />
					),
					tabBarLabel: '',
					tabBarButton: (props) => null,
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					headerTitle: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
					tabBarLabel: 'Home'
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="camera"
				options={{
					headerShown: false,
					headerTitle: 'Camera',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="camera-outline" size={size} color={color} />
					),
					tabBarLabel: 'Camera',
					headerRight: () => <LogoutButton />
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="PlantData"
				options={{
					headerShown: false,
					headerTitle: 'Plant Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
					tabBarLabel: 'Profile'
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="DontDelete1"
				options={{
					headerShown: false,
					headerTitle: 'PlaceHolder',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" size={.5} color={"black"} />
					),
					tabBarLabel: 'ttttt',
					tabBarButton: (props) => null,
				}}
				redirect={!isSignedIn}
			/>
			
		</Tabs>
	);
};

export default TabsPage;