import Link from 'next/link'
export default function UserLayout(props) {
  return (
    <>
      <style jsx>{`
        .group {
        //  display: flex;
        //  justify-content: space-around;
        }
      `}</style>
      <div className='group'>
        <Link legacyBehavior href="/detail">
          <a>Detail</a>
        </Link>
      </div>
      <div>{props.children}</div>
    </>
  );
}
