import icons from '@/constants/icons';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?:string}>();
    const [search, setSearch] = useState(params.query)
    
    const debouncedSearch = useDebouncedCallback((text:string) => 
        router.setParams({query:text}), 500
    )

    const handleSearch = (text:string) => {
        setSearch(text)
        debouncedSearch(text)
    }
  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100
    border-b border-primary-100 mt-5 py-2'>

      <View className='flex-1 flex flex-row items-center justify-end z-50'>
        <TouchableOpacity>
            <Image source={icons.filter} className='size-6' />
        </TouchableOpacity>
        <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder='Search for your next home'
            className='text-sm font-rubik text-black-300 flex-1'
            />
        <Image source={icons.search} className="size-5" />
      </View>
    </View>
  )
}

export default Search