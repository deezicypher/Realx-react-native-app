import Review from '@/components/Review'
import { facilities } from '@/constants/data'
import icons from '@/constants/icons'
import images from '@/constants/images'
import instance from '@/services/api'
import { formatCurrency } from '@/services/formatter'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Dimensions, FlatList, Image, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Property = () => {
    const {id} = useLocalSearchParams()
    const windowHeight = Dimensions.get("window").height;
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const {data:property} = useQuery({queryKey:['property',id], queryFn: async () => {
        const res = await instance.get(`/properties/${id}`)
        return res.data
    }})

    const viewImage = (image: string) => {
      setSelectedImage(image)
    }

    const location = (() => {
      const geolocation = property?.geolocation
      if (typeof geolocation !== 'string') return null

      const [latitude, longitude] = geolocation
        .split(',')
        .map((value) => Number(value.trim()))

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

      return {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    })()


  return (
    <>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-40 bg-white'
    >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image}}
            className="size-full"
            resizeMode="cover"
          />
          <View className='absolute rounded-2xl inset-0 bg-black/35' />
          <View className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
            >
          <View className='w-full absolute mt-10  flex flex-row items-center justify-between'>
            <TouchableOpacity onPress={() => router.back()} >
            <Image source={icons.backArrow} tintColor={"#fff"} className='size-8' />
            </TouchableOpacity>
            <View className='flex flex-row items-center gap-5 justify-between'>
              <Image source={icons.heart} tintColor={"#fff"} className='size-6'/>
              <Image source={icons.send} tintColor={"#fff"} className='size-6' />
            </View>
          </View>
          </View>
        </View>

        <View className='flex flex-col mt-5 gap-5 justify-between px-5'>
          <Text className="text-2xl font-rubik-extrabold text-black-300 ">{property?.name}</Text>
          <View className='flex flex-row items-center gap-3'>
            <Text className='text-primary-300 font-rubik-medium text-xs'>
              {property?.type}
            </Text>
            <View className='flex flex-row gap-1'>
              <Image source={icons.star} className='size-5' />
              <Text className='font-rubik-medium text-sm text-black-200'>
                {property?.rating} ({property?.reviews?.length})
              </Text>
            </View>
          </View>

          <View className='flex flex-row gap-5'>
            <View className='flex flex-row gap-2'>
              <Image source={icons.bed} className='size-4' />
              <Text className='text-sm text-black-300 font-rubik-medium'>
                {property?.bedrooms} Beds
              </Text>
            </View>
            <View className='flex flex-row gap-2'>
              <Image source={icons.bath} className='size-4' />
              <Text className='text-sm text-black-300 font-rubik-medium'>
                {property?.bathrooms} Bath
              </Text>
            </View>
            <View className='flex flex-row gap-2'>
              <Image source={icons.area} className='size-4' />
              <Text className='text-sm text-black-300 font-rubik-medium'>
                {property?.area} sqft
              </Text>
            </View>
          </View>

          <View className='flex flex-col gap-3 mt-5'>
            <Text className='text-xl font-rubik-bold text-black-300'>Agent</Text>
            <View className='flex flex-row items-center justify-between gap-5'>
              <Image source={{uri:property?.agent.avatar}} className='size-14 rounded-full' />
              <View className='flex flex-col  justify-center'>
                <Text className='text-lg font-rubik-bold text-black-300'>
                  {property?.agent.name}
                </Text>
                <Text className='text-sm font-rubik-medium text-black-200'>
                  {property?.agent.email}
                </Text>
              </View>
              <View className='flex flex-row items-center gap-3 justify-between'>
              <Image source={icons.chat} className='size-8'/>
              <Image source={icons.phone} className='size-8' />
              </View>
            </View>
          </View>

          <View className='flex flex-col gap-2 mt-5'>
            <Text className='text-xl font-rubik-bold text-black-300'>Overview</Text>
            <Text className='text-base font-rubik text-black-200'>
              {property?.description}
            </Text>
          </View>

          <View className='flex flex-col gap-5 mt-5'>
            <Text className='text-xl font-rubik-bold text-black-300'>Facilities</Text>

            {property?.facilities.length > 0 && (
              <View className='flex flex-row flex-wrap items-start justify-start gap-5'>
                {property?.facilities.map((item:string, index:number) => {
                  const facility = facilities.find(f => f.title = item)
                  return (
                    <View key={index} className='flex flex-1 flex-col items-center min-w-16 max-w-20'>
                      <View className='size-14 bg-primary-100 rounded-full flex items-center justify-center'>
                        <Image source={facility? facility.icon : icons.info} className='size-6'/>
                      </View>
                      <Text
                      numberOfLines={1}
                      ellipsizeMode='tail'
                       className='text-black-300 text-sm text-center font-rubik mt-1.5'>
                        {facility?.title}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )}
          </View>

        {property?.galleries?.length > 0 && (
          <View className='flex flex-col gap-5 mt-5'>
            <Text className='text-xl font-rubik-bold text-black-300'>Gallery</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={property?.galleries}
              keyExtractor={(item) => item.$id}
              contentContainerClassName='flex gap-4 mt-4'
              contentContainerStyle={{paddingRight:20}}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => viewImage(item)}>
                  <Image source={{uri:item}} className='size-40 rounded-xl'/>
                </TouchableOpacity>
              )}
              />
          </View>
        ) }

        
        <View className='flex flex-col gap-5 mt-5'>
          <Text className='text-xl font-rubik-bold text-black-300'>Location</Text>
          <View className='flex flex-row items-center justify-start gap-2'>
            <Image source={icons.location} className='size-7'/>
            <Text className='text-black-200 font-rubik-medium text-sm'>
              {property?.address}
            </Text> 
          </View>
            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
{/* 
          {location ? (
            <MapView
              style={{ height: 220, width: '100%', borderRadius: 16 }}
              initialRegion={location}
              showsUserLocation={false}
              showsTraffic={false}
            >
              <Marker
                coordinate={location}
                title={property?.name}
                description={property?.address}
              />
            </MapView>
          ) : (
            <View className='h-24 items-center justify-center rounded-xl border border-primary-200 bg-primary-100'>
              <Text className='text-sm font-rubik-medium text-black-200'>Location coordinates are unavailable.</Text>
            </View>
          )} */}
        </View>

        <View className='flex flex-col gap-5'>
          <View className='flex flex-row items-center justify-between mt-5'>
            <View className='flex flex-row gap-2 items-center'>
              <Image source={icons.star} className='size-6' />
              <Text className='text-black-300 font-rubik-bold text-xl'>
                  {property?.rating} ({property?.reviews?.length ?? 0} reviews)
              </Text>
            </View>

          <TouchableOpacity
            onPress={() => {
              if (!property?.reviews?.length) return

              router.push({
                pathname: '/properties/reviews',
                params: {
                  reviews: JSON.stringify(property.reviews),
                },
              })
            }}
          >
              <Text className="text-base font-rubik-bold text-primary-300">View All</Text>
          </TouchableOpacity>
          </View>
          <Review item={property?.reviews?.[0]} />
        </View>

        <View className='flex flex-row items-center justify-between gap-5 mt-10'>
          <View className='flex flex-col justify-between'>
            <Text className='text-black-200 text-sm font-rubik-medium'>
              Price
            </Text>
            <Text numberOfLines={1} className='text-primary-300 text-2xl font-rubik-bold'>
              {formatCurrency(property?.price)}
            </Text>
          </View>

          <TouchableOpacity className='flex-1  bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400'>
              <Text className='text-white text-lg text-center font-rubik-bold'>
                Book Now
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

    <Modal
      visible={selectedImage !== null}
      transparent={false}
      animationType="fade"
      onRequestClose={() => setSelectedImage(null)}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedImage(null)}
        className="flex-1 items-center justify-center bg-black"
      >
        <Image
          source={{ uri: selectedImage ?? undefined }}
          className="w-full h-full"
          resizeMode="contain"
          accessibilityLabel="Full-sized property image"
        /> 
      </TouchableOpacity>
    </Modal>
    </>
  )
}

export default Property