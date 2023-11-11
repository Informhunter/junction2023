import re
import asyncio
from dataclasses import dataclass
from urllib.parse import urlencode

import aiohttp
from bs4 import BeautifulSoup
from bs4.element import Tag


_BACKGROUND_IMAGE_URL_REGEX = re.compile(r'url\((.*)\)', re.DOTALL | re.IGNORECASE)


@dataclass
class WikihowSearchResult:
    url: str
    title: str
    thumbnail_url: str


def extract_wikihow_result(result_tag_block: Tag) -> WikihowSearchResult:
    url = result_tag_block['href']
    title = result_tag_block.find('div', class_='result_title').text
    thumbnail_tag = result_tag_block.find('div', class_='result_thumb')
    print(thumbnail_tag)
    print('"', thumbnail_tag.attrs.get('style'), '"')
    thumbnail_url = _BACKGROUND_IMAGE_URL_REGEX.search(thumbnail_tag.attrs.get('style')).group(1)
    return WikihowSearchResult(url=url, title=title, thumbnail_url=thumbnail_url)


async def search_wikihow(query: str) -> list[WikihowSearchResult] | None:
    encoded_query = urlencode({'search': query})
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://www.wikihow.com/wikiHowTo?search={encoded_query}') as resp:
            result = await resp.text()
            soup = BeautifulSoup(result, 'html.parser')
            result_block_list = soup.find_all('a', class_='result_link')
            results = [extract_wikihow_result(result_block) for result_block in result_block_list]
            print(results)
            return results


if __name__ == '__main__':
    asyncio.run(search_wikihow('how to deal with losing keys'))
