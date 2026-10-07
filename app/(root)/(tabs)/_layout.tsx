import icons from '@/constants/icons'
import { components } from '@/constants/theme'
import { useAuth } from '@/context/AuthContext'
import { Redirect, Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const tabBar = components.tabBar

const TabIcon = ({focused, icon, title}:{focused:boolean,icon:any,title:string}) => (
        <View className='flex-1 mt-3 flex flex-col items-center'>
            <Image  source={icon} tintColor={focused ? '#0061ff' : '#666876'}
            resizeMode='contain' className='size-6 text-black-300' />
            <Text className={`${focused ? 'text-primary-300 font-rubik-medium': 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
                {title}
            </Text>
        </View>     
)
const TabLayout = () => {
    const insets = useSafeAreaInsets()
    const {user} = useAuth();

    if (!user) {
        return <Redirect href="/(root)/(auth)" />;
    }
    
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position:"absolute",
                borderTopColor: '#0061FF1A',
                borderTopWidth:0,
                height: tabBar.height,
                bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                //marginHorizontal: tabBar.horizontalInset,
            },
            tabBarItemStyle: {
                paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
            },
            tabBarIconStyle: {
                width: tabBar.iconFrame,
                height: tabBar.iconFrame,
                alignItems: 'center',
            }
        }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title:"Home",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.home} title='Home'/>
                    )
                }}
                />
                <Tabs.Screen 
                    name="explore"
                    options={{
                        title:"Explore",
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} icon={icons.search} title='Explore'/>
                        )
                    }}
                />
                <Tabs.Screen 
                    name="profile"
                    options={{
                        title:"Profile",
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} icon={icons.person} title='Profile'/>
                        )
                    }}
                />
        </Tabs>
  )
}

export default TabLayout