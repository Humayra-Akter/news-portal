import RootLayout from "@/components/Layouts/RootLayout";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";

const NewsDetailPage = ({ news }) => {
  return (
    <div
      style={{
        margin: "200px 0",
        width: "100%",
      }}
    >
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={12}>
          <div>
            <Image
              src={news?.image_url}
              width={500}
              height={300}
              responsive
              alt="news image"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <h1>{news?.title}</h1>
            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                width: "100%",
                background: "#000",
              }}
            ></div>
            <p
              style={{
                display: "flex",
                margin: "10px 0",
                width: "100%",
                color: "gray",
                justifyContent: "space-between",
              }}
            >
              <span>
                <CalendarOutlined /> {news?.release_date}
              </span>
              <span>
                <CommentOutlined /> {news?.comment_count} COMMENTS
              </span>
              <span>
                <ProfileOutlined /> {news?.category}
              </span>
            </p>

            <p
              style={{
                fontSize: "20px",
              }}
            >
              {news?.description}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const newses = await res.json();

//   const paths = newses.map((news) => ({
//     params: {
//       newsId: news.id,
//     },
//   }));

//   return { paths, fallback: false };
// };

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);

  const data = await res.json();
  console.log(data);
  return {
    props: {
      news: data,
    },
  };
};