import re
from urllib.parse import urlencode

import aiohttp
from bs4 import BeautifulSoup
from bs4.element import Tag

from src.models import WikihowSearchResult


_BACKGROUND_IMAGE_URL_REGEX = re.compile(r'url\((.*)\)')


def extract_wikihow_result(result_tag_block: Tag) -> WikihowSearchResult:
    url = result_tag_block['href']
    title = result_tag_block.find('div', class_='result_title').text
    thumbnail_tag = result_tag_block.find('div', class_='result_thumb')
    url_match = _BACKGROUND_IMAGE_URL_REGEX.search(thumbnail_tag.attrs.get('style', ''))
    if url_match is not None:
        thumbnail_url = url_match.group(1)
    else:
        thumbnail_url = None
    return WikihowSearchResult(url=url, title=title, thumbnail_url=thumbnail_url)


async def search_wikihow(query: str) -> list[WikihowSearchResult] | None:
    encoded_query = urlencode({'search': query})
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://www.wikihow.com/wikiHowTo?search={encoded_query}') as resp:
            result = await resp.text()
            soup = BeautifulSoup(result, 'html.parser')
            result_block_list = soup.find_all('a', class_='result_link')
            results = [extract_wikihow_result(result_block) for result_block in result_block_list]
            return results
