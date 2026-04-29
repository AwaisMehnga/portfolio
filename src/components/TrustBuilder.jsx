import ExperienceSection from './trust/ExperienceSection'
import TestimonialsSection from './trust/TestimonialsSection'
import EducationSection from './trust/EducationSection'
import CertificationsSection from './trust/CertificationsSection'
import StatisticsSection from './trust/StatisticsSection'

function TrustBuilder() {
  return (
    <>
      <StatisticsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <EducationSection />
      <CertificationsSection />
    </>
  )
}

export default TrustBuilder
