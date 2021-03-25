import axios from 'axios';
import cheerio from 'cheerio';
import ApiError from '../error/ApiError';

interface CityI{
    code: string;
    city: string;
    province: string;
}

interface JobPostsI{
    title: string;
    company: string;
    location: string;
    summary: string;
    link: string;
}



const getJobPosts = async (cities: CityI[]) => {
    try{

        let postings: JobPostsI[] = []
        let url = ""

        for(let city of cities){
            
            url = `https://ca.indeed.com/jobs?as_and=web+developer&as_phr=&as_any=web+software+developer+react+javascript+typescript+node+css+html+sass+scss+junior+intermediate+back+front&as_not=&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l=${city.city}%2C+${city.province}&fromage=3&limit=20&sort=date&psf=advsrch&from=advancedsearch`

            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $('div.jobsearch-SerpJobCard').each((ind, el) => {
                postings.push({
                    title: $(el).find('h2.title').text().trim().replace("new", ""),
                    company: $(el).find('div > span.company').text().trim(),
                    location: $(el).find('div > .location').text().trim(),
                    summary: $(el).find('div > div.summary').text().trim(),
                    link: `https://ca.indeed.com${$(el).find('h2.title > a.jobtitle').attr('href')}`
                })
            })
        }

        return postings

    } catch(err){
        return ApiError.badRequest('Unable to Get Job Postings...')
    }
}

export default getJobPosts;