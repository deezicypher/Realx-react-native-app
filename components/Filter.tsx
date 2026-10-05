import { categories } from '@/constants/data';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const Filter = () => {
    const params = useLocalSearchParams<{filter?:string}>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All')

    const handleCategory = (category:string) => {
        setSelectedCategory(category)
        router.setParams({filter:category})
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
    className='mt-3 mb-2'
    contentContainerStyle={{ alignItems: 'center' }}>
     
            {categories.map((item,index) => (
                <TouchableOpacity key={index} 
                onPress={() => handleCategory(item.category)}
                className={`flex flex-col items-center justify-center mr-4 px-4 rounded-full
                 ${selectedCategory === item.category ? 'h-12' : 'h-9'}
                 ${selectedCategory === item.category? 'bg-primary-300' : 'bg-primary-100 border border-primary-200' }`}>
                    <Text className={`${selectedCategory === item.category ? 'text-white text-base font-rubik-bold mt-0.5' : 'text-sm text-black-300 font-rubik'}`}>{item.title}</Text>
                </TouchableOpacity>
            ))}
 
    </ScrollView>
  )
}

export default Filter