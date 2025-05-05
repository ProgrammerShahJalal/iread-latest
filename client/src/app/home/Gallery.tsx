import Image from 'next/image'
import React from 'react'
import ImageGallery from './ImageGallary'
import { getSettingValue } from '../../api/settingValuesApi'

type Props = {}

const staticImages = [
  {
    "id": "gallery1",
    "src": "https://cdn.pixabay.com/photo/2024/12/28/01/27/ai-generated-9295105_1280.jpg"
  },
  {
    "id": "gallery2",
    "src": "https://cdn.pixabay.com/photo/2024/01/24/15/10/ai-generated-8529788_1280.jpg"
  },
  {
    "id": "gallery3",
    "src": "https://cdn.pixabay.com/photo/2022/09/29/17/15/halloween-7487706_960_720.jpg"
  },
  {
    "id": "gallery4",
    "src": "https://cdn.pixabay.com/photo/2022/12/30/10/52/mountain-7686642_1280.jpg"
  },
  {
    "id": "gallery5",
    "src": "https://cdn.pixabay.com/photo/2024/01/19/19/20/ai-generated-8519656_960_720.jpg"
  },
  {
    "id": "gallery6",
    "src": "https://cdn.pixabay.com/photo/2024/03/05/03/53/ai-generated-8613606_960_720.png"
  },
  {
    "id": "gallery7",
    "src": "https://cdn.pixabay.com/photo/2024/02/20/09/56/network-connections-8585083_1280.jpg"
  },
  {
    "id": "gallery8",
    "src": "https://cdn.pixabay.com/photo/2021/03/29/12/16/stairs-6133971_960_720.jpg"
  }
]

async function Gallery({ }: Props) {
  const settingImages = await getSettingValue('Home Gallery')

  let finalImages
  try {
    finalImages = settingImages?.value
      ? typeof settingImages.value === 'string'
        ? JSON.parse(settingImages.value)
        : settingImages.value
      : staticImages
  } catch (error) {
    console.error('Error parsing settingImages.value:', error)
    finalImages = staticImages
  }

  const imageUrls = Array.isArray(finalImages) ? finalImages.map((image) => image.src) : []

  return (
    <section id="gallery" className="bg-lighter">
      <div className="container">
        <div className="section-title mb-10">
          <div className="row">
            <div className="col-md-12 text-3xl">
              <h2 className="mt-0 text-uppercase text-theme-colored title line-bottom line-height-1">
                Our
                <span className="text-theme-color-2 font-weight-400"> Gallery</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="container section-content">
          <div>
            <ImageGallery images={imageUrls} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery;
