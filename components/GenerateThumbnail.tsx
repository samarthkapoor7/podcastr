import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label';
import { Textarea } from './ui/textarea';
import { GenerateThumbnailProps } from '@/types';
import { Loader } from 'lucide-react';
import { Input } from './ui/input';
import Image from 'next/image';
import { useToast } from './ui/use-toast';

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt , setImagePrompt }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setisAiThumbnail] = useState(false);
  const [isImageLoading, setisImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const {toast} = useToast();

  const handleImage = async (blog: Blob, fileName: string) => {
    setisImageLoading(true);
    setImage('');

    try {
      
    } catch (error) {
      console.log(error)
      toast({ title: 'Error generatiung thumbnail', variant: 'destructive'})
    }
  }
  const generateImage = async () => {}
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {}
  return (
    <>
    <div className='generate_thumbnail'>
      <Button
        type="button"
        variant="plain"
        onClick={() => setisAiThumbnail(true)}
        className={cn('', {
          'bg-black-6': isAiThumbnail
        })}>
          Use AI to generate thumbnail
      </Button>
      <Button
        type="button"
        variant="plain"
        onClick={() => setisAiThumbnail(false)}
        className={cn('', {
          'bg-black-6': !isAiThumbnail
        })}>
          Upload custom image
      </Button>
    </div>
    {isAiThumbnail ? (
      <div className='flex flex-col gap-5'>
        <div className="mt-5 flex flex-col gap-2.5">
          <Label className="text-16 font-bold text-white-1">
        AI Prompt to generate Thumbnail
          </Label>
        <Textarea
        className="input-class font-light focus-visible:ring-offset-orange-1"
        placeholder='Provide text to generate thumbnail'
        rows={5}
        value={imagePrompt}
        onChange={(e) => setImagePrompt(e.target.value)}
      />
    </div>
    <div className="w-full max-w-[200px]">
    <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generateImage}>
      {isImageLoading ? (
        <>
          Generating
          <Loader size={20} className="animate-spin ml-2" />
        </>
      ) : (
        'Generate'
      )}
    </Button>
    </div>
      </div>
    ) : (
      <div className='image_div' onClick={() => imageRef?.current?.click()}>
        <Input
        type='file'
        className='hidden'
        ref={imageRef}
        onChange={(e) => uploadImage(e)}
        />
        {!isImageLoading ? (
          <Image src="/icons/upload-image.svg" width={40} height={40} alt="upload" />
        ) : (
          <div className='text-16 flex-center font-medium text-white-1'>
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
            </div>
        )}
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-12 font-bold text-orange-1'>
            Click to upload
          </h2>
          <p className='text-12 font-normal text-gray-1'>SVG, PNG, JPG, or GIF (max. 1080x1080ox)</p>
        </div>
      </div>
    )}
    {image && (
      <div className='flex-center w-full'>
        <Image src={image} width={200} height={200} className='mt-5' alt='thumbnail' />
      </div>
    )}
    </>
  )
}


export default GenerateThumbnail