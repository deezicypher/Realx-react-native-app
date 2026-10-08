import Review from '@/components/Review'
import { ReviewRecord } from '@/types/review'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Reviews = () => {
  const { reviews } = useLocalSearchParams<{ reviews?: string }>()

  const parsedReviews: ReviewRecord[] = reviews ? JSON.parse(reviews) : []

  return (
 
    <SafeAreaView
    className="flex-1 bg-white px-5 py-6">
      <Text className="mb-5 text-2xl font-rubik-bold text-black-300">
        Reviews
      </Text>

      {parsedReviews.length ? (
        <FlatList
          data={parsedReviews}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-4"
          renderItem={({ item }) => <Review item={item} />}
        />
      ) : (
        <Text className="text-black-200 font-rubik-medium">
          No reviews available.
        </Text>
      )}
 
    </SafeAreaView>
  )
}

export default Reviews
