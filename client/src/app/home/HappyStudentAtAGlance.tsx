'use client';

import { happyStudentsGlance } from '@/data/happyStudentsGlance';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

// Define the expected API response type
interface SiteResponse {
  data?: {
    value: string | StatisticalItem[];
  };
}

// Define the item type for the array
interface StatisticalItem {
  id: number;
  title: string;
  count: number;
  icon: string;
}

type Props = {};

function HappyStudentAtAGlance({ }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [statisticalInfo, setStatisticalInfo] = useState<SiteResponse>();

  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const endpoints = [
      { key: 'title/Statistical Info', setter: setStatisticalInfo },
    ];

    const fetchSettings = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map(({ key }) =>
            axios.get(`${BASE_URL}/api/v1/app-setting-values/${key}`)
          )
        );
        responses.forEach((response, index) => {
          endpoints[index].setter(response.data);
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [BASE_URL]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Parse statisticalInfo?.data?.value if it's a string, otherwise use it as is
  let finalStatisticalInfo: StatisticalItem[] = happyStudentsGlance;

  if (statisticalInfo?.data?.value) {
    try {
      if (typeof statisticalInfo.data.value === 'string') {
        // Clean the string to make it valid JSON
        const cleanedValue = statisticalInfo.data.value
          .replace(/([{,]\s*)(\w+)(:)/g, '$1"$2"$3') // Quote property names (e.g., id: → "id":)
          .replace(/'/g, '"'); // Replace single quotes with double quotes
        finalStatisticalInfo = JSON.parse(cleanedValue);
      } else {
        finalStatisticalInfo = statisticalInfo.data.value;
      }
    } catch (error) {
      console.error('Error parsing statisticalInfo.data.value:', error);
      console.error('Invalid JSON string:', statisticalInfo?.data?.value);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="divider parallax layer-overlay overlay-theme-colored-9"
      data-bg-img="/frontend/images/bg/bg.png"
      data-parallax-ratio="0.7"
      style={{
        backgroundImage: 'url("/frontend/images/bg/bg.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container">
        <div className="row">
          {finalStatisticalInfo.map((item) => (
            <div className="col-xs-12 col-sm-6 col-md-3 mb-md-50" key={item.id}>
              <div className="text-center">
                <i className={`text-5xl ${item.icon} mt-5 text-theme-color-2`} />
                {isVisible && (
                  <h2 className="text-center text-white text-5xl font-bold my-2">
                    <CountUp end={item.count} duration={2.5} separator="," suffix="+" />
                  </h2>
                )}
                <h5 className="text-white text-uppercase mb-0">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HappyStudentAtAGlance;

